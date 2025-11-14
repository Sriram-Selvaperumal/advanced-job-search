import './Platforms.css';
import linkedinLogo from '../assets/Linkedin.png';
import naukriLogo from '../assets/Naukri.png';
import indeedLogo from '../assets/Indeed.png';
import glassdoorLogo from '../assets/Glassdoor.png';
import internshalaLogo from '../assets/Internshala.png';

function Platforms(){
    return(
        <div className="platforms">
            <div className='linkedin'>
                <img src={linkedinLogo} alt="LinkedIn" width={200} />
            </div>
            <div className='naukri'>
                <img src={naukriLogo} alt="Naukri" width={200} />
            </div>
            <div className='Indeed'>
                <img src={indeedLogo} alt="Indeed" width={200} />
            </div>
            <div className='Glassdoor'>
                <img src={glassdoorLogo} alt="Glassdoor" width={200} />
            </div>
            <div className='Internshala'>
                <img src={internshalaLogo} alt="Internshala" width={200} />
            </div>
        </div>
    )
}

export default Platforms;
