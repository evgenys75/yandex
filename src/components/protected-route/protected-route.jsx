import { useAuth } from '../../services/auth';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    console.log(isUserLoaded);
    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    });

    if (!isUserLoaded) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={() =>
                auth.user.userAuth ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
                    />
                )
            }
        />
    );
}