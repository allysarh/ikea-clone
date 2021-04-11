import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const BreadcrumbComp = (props) => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="/" style={{color: '#bfc6cb'}}>Client</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <Link to="/client" style={{ fontWeight: 'bold', color: '#6e7a89' }}>Access</Link>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbComp;