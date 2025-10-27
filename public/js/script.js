const talks = [
    {
        title: 'The Future of JavaScript',
        speakers: ['Jane Doe'],
        category: ['JavaScript', 'Future Tech'],
        description: 'A look into the next 5 years of JavaScript development.'
    },
    {
        title: 'CSS Grid for Modern Layouts',
        speakers: ['John Smith'],
        category: ['CSS', 'Web Design'],
        description: 'Learn how to create complex and responsive layouts with CSS Grid.'
    },
    {
        title: 'Building Scalable APIs with Node.js',
        speakers: ['Peter Jones'],
        category: ['Node.js', 'APIs'],
        description: 'An in-depth guide to building robust and scalable APIs.'
    },
    {
        title: 'Introduction to Machine Learning',
        speakers: ['Mary Johnson'],
        category: ['Machine Learning', 'AI'],
        description: 'A beginner-friendly introduction to the world of machine learning.'
    },
    {
        title: 'The Power of Serverless',
        speakers: ['David Williams'],
        category: ['Serverless', 'Cloud'],
        description: 'Discover the benefits of serverless architecture and how to get started.'
    },
    {
        title: 'Cybersecurity in 2025',
        speakers: ['Susan Brown', 'James Taylor'],
        category: ['Cybersecurity', 'Security'],
        description: 'An overview of the latest trends and threats in cybersecurity.'
    }
];

const scheduleContainer = document.getElementById('schedule');
const searchInput = document.getElementById('searchInput');

function generateSchedule(filter = '') {
    let scheduleHtml = '';
    let currentTime = new Date('2025-10-27T10:00:00');

    const filteredTalks = talks.filter(talk => 
        talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
    );

    filteredTalks.forEach((talk, index) => {
        const startTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentTime.setHours(currentTime.getHours() + 1);
        const endTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        scheduleHtml += `
            <div class="talk">
                <h2>${talk.title}</h2>
                <p class="details">
                    <strong>Time:</strong> ${startTime} - ${endTime}<br>
                    <strong>Speakers:</strong> ${talk.speakers.join(', ')}<br>
                    <strong>Category:</strong> ${talk.category.join(', ')}
                </p>
                <p>${talk.description}</p>
            </div>
        `;

        if (index === 2) { // Lunch break after the 3rd talk
            const lunchStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            currentTime.setHours(currentTime.getHours() + 1);
            const lunchEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            scheduleHtml += `
                <div class="talk">
                    <h2>Lunch Break</h2>
                    <p class="details">
                        <strong>Time:</strong> ${lunchStartTime} - ${lunchEndTime}<br>
                    </p>
                </div>
            `;
        } else if (index < filteredTalks.length - 1) {
             currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
    });

    scheduleContainer.innerHTML = scheduleHtml;
}

searchInput.addEventListener('keyup', () => {
    generateSchedule(searchInput.value);
});

generateSchedule();
