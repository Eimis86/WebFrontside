import {useAuthRequest} from '@app/store/utils';
import {api} from '@app/requests';
import {useEffect} from 'react';
import {UserProfileUpdate} from '@app/store/profile/types';
import {omit} from 'lodash';
import {useLogin, useUserAuthState} from '@app/store/user';
import {useRecoilState} from 'recoil';
import {userProfileAtom} from '@app/store/profile/atom';
import {profileFromApi} from '@app/store/profile/fromApi';



export function useUserProfile() {
    const {request} = useAuthRequest();
    const {login} = useLogin();
    const {isSigned} = useUserAuthState();

    const [data, setData] = useRecoilState(userProfileAtom);

    const load = async () => {
        const data = await request(api.getProfileMy, {});
        if (data) {
            setData(profileFromApi(data));
        }
    };

    const addImage = async (image: string) => {
        const data = await request(api.addUserImage, image);
        if (data) {
            setData(profileFromApi(data));
        }
    };

    const deleteImage = async () => {
        const data = await request(api.deleteUserImage, {});
        if (data) {
            setData(profileFromApi(data));
        }
    };

    const update = async (newData: UserProfileUpdate) => {
        if (newData.imageStr) {
            await addImage(newData.imageStr);
        }

        await request(api.updateProfileMy, omit(newData, 'imageStr'));

        if (newData.newPassword) {
            //Update JWT token after password changed
            await login({
                email: newData.email,
                password: newData.newPassword,
                remember: true
            });
        }


        setData(prevState => ({
            ...prevState!,
            email: newData.email,
            name: newData.name
        }));
    };

    useEffect(() => {
        if (isSigned && !data) {
            load();
        }

        if (!isSigned && data) {
            setData(undefined);
        }
    }, [isSigned]);

    return {
        data,
        load,
        update,
        addImage,
        deleteImage
    };
}
