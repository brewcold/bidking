import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const ROOT = process.env.REACT_APP_WS_ROOT || '';
export const SocketContext = createContext<Socket>(
  io(ROOT, {
    withCredentials: true,
    transports: ['websocket'],
  })
);

export const useSocketListener = <Res>(event: string, handler: (data: Res, ...args: any[]) => void, deps?: any[]) => {
  const [err, setError] = useState<unknown[]>([]);
  const socket = useContext(SocketContext);

  const stableHandler = useCallback(handler, deps || []);

  useEffect(() => {
    try {
      socket.on(event, stableHandler);
      setError([]);
    } catch (error) {
      setError([...err, error]);
    }
    return () => {
      socket.off(event, stableHandler);
    };
  }, [socket, event, stableHandler]);

  return { error: err };
};

export interface socketEmitRequest {
  roomId: number | undefined;
}

export const useSocketEmitter = <T extends socketEmitRequest>(event: string, data: T) => {
  const [err, setError] = useState<unknown[]>([]);
  const socket = useContext(SocketContext);
  const roomId = data.roomId;

  useEffect(() => {
    try {
      {
        socket.emit(event, { data });
        setError([]);
      }
    } catch (error) {
      setError([...err, error]);
    }
    return () => {
      socket.emit('leaveRoom', { roomId });
    };
  }, [socket, event, roomId]);

  return { error: err };
};

export const useSocketEmitterWithTrigger = <T extends socketEmitRequest>(event: string, data: T) => {
  const [err, setError] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const trigger = () => setLoading(true);
  const socket = useContext(SocketContext);
  const roomId = data.roomId;

  useEffect(() => {
    if (loading)
      try {
        {
          socket.emit(event, { data });
          setError([]);
        }
      } catch (error) {
        setError([...err, error]);
      } finally {
        setLoading(false);
      }
    return () => {
      socket.emit('leaveRoom', { roomId });
    };
  }, [socket, event, roomId, loading]);

  return { error: err, trigger };
};
