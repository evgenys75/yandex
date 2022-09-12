import {useAuth} from '../../services/auth';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

export function ProtectedRoute({children, ...rest}) {
    const location = useLocation();
    let {getUser, ...auth} = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

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
                        to={{
                            pathname: "/login",
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
}