import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import OverviewAdmin from '../OverviewAdmin/OverviewAdmin';
import OverviewTeacher from '../OverviewTeacher/OverviewTeacher';

const Overview = () => {

    const {role} = useUserRole();
    return (
        <div>
           {
            role ==="admin" && <OverviewAdmin/>
           }
           {
            role ==="teacher" && <OverviewTeacher/>
           }
        </div>
    );
};

export default Overview;