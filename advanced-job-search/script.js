// Sample Job Data (Mocking a feed)
const sampleJobs = [
    {
        title: "Frontend Developer",
        company: "TechNova",
        location: "San Francisco, CA (Hybrid)",
        posted: "2 days ago",
        logo: "TN"
    },
    {
        title: "Product Designer",
        company: "Creative Studio",
        location: "Remote",
        posted: "1 day ago",
        logo: "CS"
    },
    {
        title: "Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        posted: "3 days ago",
        logo: "G"
    },
    {
        title: "Marketing Manager",
        company: "GrowthX",
        location: "New York, NY",
        posted: "5 hours ago",
        logo: "GX"
    },
    {
        title: "Data Analyst",
        company: "FinTech Sol",
        location: "Chicago, IL",
        posted: "1 week ago",
        logo: "FS"
    },
    {
        title: "UX Researcher",
        company: "UserZoom",
        location: "Austin, TX (Remote)",
        posted: "4 days ago",
        logo: "UZ"
    },
    {
        title: "Backend Engineer",
        company: "Amazon",
        location: "Seattle, WA",
        posted: "Just now",
        logo: "A"
    },
    {
        title: "Project Manager",
        company: "BuildIt",
        location: "Denver, CO",
        posted: "2 weeks ago",
        logo: "B"
    }
];

// Elements
function showToast() {
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', renderJobs);

searchBtn.addEventListener('click', handleSearch);

// Allow "Enter" key to search
[keywordInput, locationInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});
