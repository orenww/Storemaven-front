import React from "react";

const UserContext = React.createContext<any>({
    userName:"",
    numOfSuccess:0
});

export default UserContext