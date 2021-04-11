import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container" style={{ width: '100%', textAlign: 'center', height: '100vh', margin: '5% 10%' }}>
                <h4>Oopsie!</h4>
                <h1 style={{ fontSize: '5vw', fontWeight: 'bold' }}>404 Page Not Found</h1>
                <img src="https://image.flaticon.com/icons/png/128/2748/2748792.png" className="m-3" /><br />
                <h4>You're not in the radar!</h4>
                <Link to ="/">
                    <Button color='warning' className="m-3">Back to Home</Button>
                </Link>
            </div>);
    }
}
export default NotFoundPage;