import './Platforms.css';
import linkedinLogo from '../assets/Linkedin.png';
import naukriLogo from '../assets/Naukri.png';
import indeedLogo from '../assets/Indeed.png';
import glassdoorLogo from '../assets/Glassdoor.png';
import internshalaLogo from '../assets/Internshala.png';

function Platforms({ onPlatformClick }) {
  return (
    <div className="platforms">
      <div onClick={() => onPlatformClick("LinkedIn")}>
        <img src={linkedinLogo} alt="LinkedIn" width={200} />
        <span>LinkedIn</span>
      </div>
      <div onClick={() => onPlatformClick("Naukri")}>
        <img src={naukriLogo} alt="Naukri" width={200} />
        <span>Naukri</span>
      </div>
      <div onClick={() => onPlatformClick("Indeed")}>
        <img src={indeedLogo} alt="Indeed" width={200} />
        <span>Indeed</span>
      </div>
      <div onClick={() => onPlatformClick("Glassdoor")}>
        <img src={glassdoorLogo} alt="Glassdoor" width={200} />
        <span>Glassdoor</span>
      </div>
      <div onClick={() => onPlatformClick("Internshala")}>
        <img src={internshalaLogo} alt="Internshala" width={200} />
        <span>Internshala</span>
      </div>
    </div>
  );
}

export default Platforms;
