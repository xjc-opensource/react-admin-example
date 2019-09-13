import React from 'react'
import './style.css'

class Home extends React.Component {
    render() {
        let helloString = " Hello World  !!!";
        return (
            <div style={styles.bg} className='home'   >
                Hello World!!!
                <div dangerouslySetInnerHTML={{ __html: helloString }} />
            </div>
        )
    }
}

const styles = {
    bgxx: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 64px)'
    }
}

export default Home