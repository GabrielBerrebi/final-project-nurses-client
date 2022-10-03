import React from 'react';

const SidebarWrapper = ({children} : React.PropsWithChildren<{}>) => {
    return (
        <div>
            <div>{children}</div>
            {/*<Sidebar></Sidebar>*/}
        </div>
    );
}

export default SidebarWrapper;
