import './Platforms.css';
import linkedinLogo from '../assets/Linkedin.png';
import naukriLogo from '../assets/Naukri.png';
import indeedLogo from '../assets/Indeed.png';
import glassdoorLogo from '../assets/Glassdoor.png';
import internshalaLogo from '../assets/Internshala.png';

function Platforms(){
    return(
        <div className="platforms">
            <div className='Linkedin'>
                <img src={linkedinLogo} alt="LinkedIn" width={200} />
                <span>LinkedIn</span>
            </div>
            <div className='Naukri'>
                <img src={naukriLogo} alt="Naukri" width={200} />
                <span>Naukri</span>
            </div>
            <div className='Indeed'>
                <img src={indeedLogo} alt="Indeed" width={200} />
                <span>Indeed</span>
            </div>
            <div className='Glassdoor'>
                <img src={glassdoorLogo} alt="Glassdoor" width={200} />
                <span>Glassdoor</span>
            </div>
            <div className='Internshala'>
                <img src={internshalaLogo} alt="Internshala" width={200} />
                <span>Internshala</span>
            </div>
        </div>
    )
}

export default Platforms;
