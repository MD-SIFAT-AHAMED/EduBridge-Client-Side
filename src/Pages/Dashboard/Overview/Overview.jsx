import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import OverviewAdmin from '../OverviewAdmin/OverviewAdmin';
import OverviewTeacher from '../OverviewTeacher/OverviewTeacher';
import OverviewStudent from '../OverviewStudent/OverviewStudent';

const Overview = () => {

    const {role} = useUserRole();
    return (
        <div>
            {
                role === "student" && <OverviewStudent/>
            }
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