import { supabase } from "./client";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerModel, setAuth } from "../redux";
import { AuthModel } from "../redux/models";


const useAuth = () => {

    const dispatch = useDispatch();
    const auth = useSelector<RootReducerModel>(state => state.auth) as AuthModel;

    async function checkUser () {
        const user = await supabase.auth.user();
    }

    async function signInWithGithub () {

        const { user, session, error } = await supabase.auth.signIn({
            provider: 'github'
        });
        const oauthToken = session?.provider_token;

        dispatch(setAuth({
            status: true,
            user: {
                username: 'user',
                email: 'email',
                repos: [ {
                    link: 'string',
                    name: 'string',
                    description: 'string',
                } ],
            }
        }));
    }

    async function signOut () {
        await supabase.auth.signOut();

        dispatch(setAuth({
            status: false,
            user: null
        }));
    }

    return {
        checkUser,
        signInWithGithub,
        signOut,
        auth
    }

}

export default useAuth;