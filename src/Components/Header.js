import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAddTask }) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' &&
                <Button
                    onClick={onAdd}
                    color={showAddTask ? 'red' : 'green'}
                    text={showAddTask ? 'hide' : 'new'}
                />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    version: PropTypes.string.isRequired
}

export default Header
