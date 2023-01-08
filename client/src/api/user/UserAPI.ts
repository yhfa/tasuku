import axios from "src/api/axois.client";
export type UserAPIParams = {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        password: string;
        newPassword?: string;
    }
    userId?: string;
};

export const DeleteUserAPI = async () => {
    return axios.delete("/user");
};

export const EditUserAPI = async (params: UserAPIParams) => {
    return axios.patch("/user/", params.data);
};