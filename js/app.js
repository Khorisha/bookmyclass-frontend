let webstore = new Vue({
    el: "#app",
    data: {
        cartCount: 0,
        lessons: [
            {
                id: "M101",
                subject: "Mathematics",
                title: "Algebra Basics",
                location: "MDX Mauritius Campus",
                price: 45,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-calculator",
                description: "Learn fundamental algebra concepts and problem-solving techniques",
                category: "School Classes"
            },
            {
                id: "M102",
                subject: "Mathematics",
                title: "Geometry & Problem Solving",
                location: "MDX Mauritius Campus",
                price: 40,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-shapes",
                description: "Explore geometric shapes and develop logical thinking skills",
                category: "School Classes"
            },
            {
                id: "P101",
                subject: "Physics",
                title: "Forces & Motion",
                location: "Science Center",
                price: 50,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-atom",
                description: "Understand the laws of motion and forces in our world",
                category: "School Classes"
            },
            {
                id: "P102",
                subject: "Physics",
                title: "Electricity & Magnetism",
                location: "Science Center",
                price: 55,
                spaces: 8,
                initialSpaces: 8,
                icon: "fa-bolt",
                description: "Discover the wonders of electricity and magnetic fields",
                category: "School Classes"
            },
            {
                id: "C101",
                subject: "Chemistry",
                title: "Atoms & Molecules",
                location: "Science Lab",
                price: 48,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-flask",
                description: "Learn about atomic structure and chemical bonding",
                category: "School Classes"
            },
            {
                id: "B101",
                subject: "Biology",
                title: "Human Body Systems",
                location: "Biology Lab",
                price: 42,
                spaces: 14,
                initialSpaces: 14,
                icon: "fa-heart",
                description: "Explore the amazing systems that make up our bodies",
                category: "School Classes"
            },
            {
                id: "E101",
                subject: "English",
                title: "Grammar & Writing Skills",
                location: "Language Center",
                price: 35,
                spaces: 18,
                initialSpaces: 18,
                icon: "fa-pen-fancy",
                description: "Improve your English grammar and writing abilities",
                category: "School Classes"
            },
            {
                id: "H101",
                subject: "History",
                title: "Ancient Civilizations",
                location: "History Room",
                price: 38,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-monument",
                description: "Journey through ancient civilizations and their cultures",
                category: "School Classes"
            },
            {
                id: "G101",
                subject: "Geography",
                title: "Maps & Climate",
                location: "Geography Lab",
                price: 36,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-globe-americas",
                description: "Learn map reading and understand global climate patterns",
                category: "School Classes"
            },
            {
                id: "CS101",
                subject: "Computer Science",
                title: "Coding Fundamentals",
                location: "Computer Lab",
                price: 52,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-code",
                description: "Start your coding journey with basic programming concepts",
                category: "School Classes"
            },
            {
                id: "F101",
                subject: "French",
                title: "Everyday Conversation",
                location: "Language Center",
                price: 32,
                spaces: 16,
                initialSpaces: 16,
                icon: "fa-language",
                description: "Practice everyday French conversation and vocabulary",
                category: "School Classes"
            },
            {
                id: "D101",
                subject: "Dance",
                title: "Hip-Hop Moves",
                location: "Dance Studio",
                price: 28,
                spaces: 20,
                initialSpaces: 20,
                icon: "fa-music",
                description: "Learn cool hip-hop dance moves and choreography",
                category: "Activities"
            },
            {
                id: "D102",
                subject: "Dance",
                title: "Ballet Techniques",
                location: "Dance Studio",
                price: 30,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-user",
                description: "Master classical ballet techniques and positions",
                category: "Activities"
            },
            {
                id: "ART101",
                subject: "Painting",
                title: "Watercolor Landscapes",
                location: "Art Room",
                price: 25,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-palette",
                description: "Create beautiful landscapes using watercolor techniques",
                category: "Activities"
            },
            {
                id: "MU101",
                subject: "Music",
                title: "Guitar for Beginners",
                location: "Music Room",
                price: 40,
                spaces: 8,
                initialSpaces: 8,
                icon: "fa-guitar",
                description: "Learn basic guitar chords and play your first songs",
                category: "Activities"
            },
            {
                id: "DR101",
                subject: "Drama",
                title: "Acting & Improvisation",
                location: "Drama Hall",
                price: 32,
                spaces: 14,
                initialSpaces: 14,
                icon: "fa-theater-masks",
                description: "Develop acting skills through fun improvisation games",
                category: "Activities"
            },
            {
                id: "SP101",
                subject: "Sports",
                title: "Football Training",
                location: "Sports Field",
                price: 22,
                spaces: 25,
                initialSpaces: 25,
                icon: "fa-futbol",
                description: "Improve football skills with professional coaching",
                category: "Activities"
            },
            {
                id: "MA101",
                subject: "Martial Arts",
                title: "Karate Basics",
                location: "Dojo",
                price: 35,
                spaces: 16,
                initialSpaces: 16,
                icon: "fa-user-ninja",
                description: "Learn basic karate moves and self-defense techniques",
                category: "Activities"
            }
        ]
    },
    methods: {
        // Methods will be added in next commits
    }
});