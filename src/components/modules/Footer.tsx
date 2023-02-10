import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
const Footer = ({}) => {
    return (
        <div className='footer'>
            <h1>Code Matter</h1>
            <div className='icons'>
                <a href='https://github.com/code-matter' target='_blank' rel='noopener noreferrer'>
                    <AiFillGithub size={16} />
                </a>
                <a href='https://www.linkedin.com/in/alex-caissy/' target='_blank' rel='noopener noreferrer'>
                    <AiFillLinkedin size={16} />
                </a>
                <a href='https://www.youtube.com/@droopfpv' target='_blank' rel='noopener noreferrer'>
                    <AiFillYoutube size={16} />
                </a>
            </div>
        </div>
    )
}

export default Footer
