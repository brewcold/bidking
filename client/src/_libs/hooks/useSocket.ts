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

  const memoizedHandler = useCallback(handler, deps || []);

  useEffect(() => {
    try {
      socket.on(event, memoizedHandler);
      setError([]);
    } catch (error) {
      setError(prev => [...prev, error]);
    }
    return () => {
      socket.off(event, memoizedHandler);
    };
  }, [socket, event, memoizedHandler]);

  return { errors: err };
};

export interface socketEmitRequest {
  roomId: number | undefined;
}

export const useSocketEmitter = <Req extends socketEmitRequest, Res = unknown>(event: string, data: Req) => {
  const [err, setError] = useState<unknown[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [response, setResponse] = useState<Res | null>(null);
  const socket = useContext(SocketContext);
  const roomId = data.roomId;

  const EMIT = useCallback(() => {
    return new Promise((resolve, reject) => {
      try {
        {
          setIsExecuting(true);
          socket.emit(event, { data }, (res: Res) => {
            setResponse(res);
            resolve(res);
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }, [socket, event, data]);

  useEffect(() => {
    EMIT()
      .then(() => setIsExecuting(false))
      .catch(error => setError(prev => [...prev, error]));

    return () => {
      socket.emit('leaveRoom', { roomId });
    };
  }, [EMIT]);

  return { EMIT, response, errors: err, isExecuting };
};
