import React from ' react ';
import { View, Text, TouchableOpacity } from ' react - native ';
import { useAuth } from '../ context / AuthContext ';
export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const handleLogout = async() = > {
        console .log(' Clicou em sair ') ;
        await logout();
 console .log(' Logout executado ') ;
    };

    return (
        < View >
            < Text > Perfil </ Text >

            < Text > Nome : {user?.name} </ Text >
            < Text > Email : {user?.email} </ Text >
            < Text > Streak : {user?.streak || 0} dias </ Text >
            < Text > Membro desde : {new Date(user?.createdAt).toLocaleDateString
                (' pt - BR ')} </ Text >

            < TouchableOpacity onPress={handleLogout} >
                < Text style={{ color: 'red ' }} > Sair da Conta </ Text >
            </ TouchableOpacity >
        </ View >
    );
}
