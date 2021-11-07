import { supabase } from "../client/client";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerModel, setAuth } from "../redux";
import { AuthModel } from "../redux/models";
import { message } from "antd";
import { useEffect } from "react";


const NotifySuccess = (content: string) => {
    message.success({ content: content, duration: 1.4 });
}


const SecretStore = () => {

    let secret: string | null = null;

    const set = (newSecret: string | null | undefined) => {
        secret = newSecret ?? null;
    }

    const get = () => {
        return secret;
    }

    return {
        set, get
    }

}


const useAuth = () => {

    const secret = SecretStore();

    const dispatch = useDispatch();
    const auth = useSelector<RootReducerModel>(state => state.auth) as AuthModel;

    const resetAuth = () => dispatch(setAuth({ status: false, user: null }));


    const checkAuth = () => {
        const user = supabase.auth.user();
        const session = supabase.auth.session();
        secret.set(session?.provider_token);

        user && dispatch(setAuth({
            status: true,
            user: {
                username: user?.user_metadata.user_name,
                avatarURL: user?.user_metadata.avatar_url,
                email: user?.email || '',
                repos: [],
            }
        }));
    }

    const signInWithGithub = () => {
        supabase.auth.signIn({
            provider: 'github'
        }, {
            scopes: 'repo notifications',
            redirectTo: `${ process.env.CLIENT_URL }/github-repoboard/me`
        })
            .catch(() => {
                resetAuth();
            })
            .finally(() => {
                if (auth.status) {
                    NotifySuccess('You successfully authorized!');
                }
            });
    }

    const signOut = () => {
        supabase.auth.signOut()
            .finally(() => {
                resetAuth();
                NotifySuccess('You successfully unauthorized!');
            });
    }


    useEffect(() => {
        checkAuth();
    }, [ auth.status ]);

    return {
        signInWithGithub,
        signOut,
        auth,
        secret
    }

}

export default useAuth;