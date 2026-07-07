const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces development of software...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces design and preparation...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Students become clean coders...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on structural markup, styling...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces encapsulation...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on state management, APIs...',
        completed: false
    }
];

const container = document.querySelector('.courses-container');
const creditsSpan = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        if (course.completed) {
            card.classList.add('completed');
        }
        
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsSpan.textContent = totalCredits;
}

document.getElementById('btn-all').addEventListener('click', () => displayCourses(courses));

document.getElementById('btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

document.getElementById('btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

displayCourses(courses);