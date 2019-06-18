import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';

export function useGetGlobalMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getGlobalMessages = () => {
        return fetch(
            `${process.env.REACT_APP_API_URL}/api/messages`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load Global Chat', {
                    variant: 'error',
                })
            );
    };

    return getGlobalMessages;
}

export function useSendGlobalMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const sendGlobalMessage = body => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ body: body, global: true }),
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/messages`,
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Could send message', {
                    variant: 'error',
                });
            });
    };

    return sendGlobalMessage;
}
