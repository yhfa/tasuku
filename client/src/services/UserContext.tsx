
import { createContext } from 'react';
import { useMutation } from 'react-query';
import { EditUserAPI } from './../api/user/UserAPI';

export const UserContext = createContext<any>({})

const UserContextProvider = (props: any) => {

    /* ********************EDIT******************** */
    const {
        mutate: EditUserMutaion,
        status,
        error,
        data,
        isLoading,
        reset
    } = useMutation(EditUserAPI);

    return (
        <UserContext.Provider
            value={{ status, error, data, EditUserMutaion, reset, isLoading }}
        >
            {props.children}
        </UserContext.Provider>
    );


}
export default UserContextProvider;