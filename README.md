# BookMyClass - Frontend Application

## About This Project

BookMyClass is a website I built for my coursework that helps parents book after-school classes and activities for their children aged 5 to 18 years old. Parents can browse available classes, select preferred days (Monday to Saturday), and book spaces for their children. It's a frontend application made with Vue.js that connects to a backend server to manage all the class data and bookings.

## Project Links

- **Frontend GitHub Repository**: https://github.com/Khorisha/bookmyclass-frontend.git
- **Live Website (GitHub Pages)**: https://khorisha.github.io/bookmyclass-frontend/
- **Backend API**: `https://bookmyclass-backend.onrender.com`

## What I Used to Build This

- **Vue.js 2.7.8** - The main framework for the website
- **Bootstrap 5.3.0** - For styling and making it look nice
- **Font Awesome 6.4.0** - For the icons
- **JavaScript Fetch API** - To get data from the backend
- **Custom CSS** - For additional styling and layout

## Main Features

### Display List of Lessons
- Shows at least 10 different lessons with 5 spaces availability each
- Each lesson displays: Subject, Location, Price, Spaces (availability), and Font Awesome icons
- Uses Vue's `v-for` directive for efficient rendering of lesson lists
- Responsive grid layout that works well on phones and computers

### Static Image Management
- **Subject Icons**: Each class subject has a corresponding PNG icon stored on the backend server
  - Icons are served from the backend server's lesson-icons folder
  - Example: Math class uses math.png, Science class uses science.png
- **Banner Images**: Main banner image stored in backend assets folder
- **Dynamic Image Loading**: Images are loaded based on subject names for consistency across the application

### Age-Appropriate Booking System
- Parents can only book classes for children aged 5 to 18 years
- Child's age is validated during the booking process (must be between 5-18)
- Age input field with min="5" and max="18" attributes
- Age restrictions ensure children are placed in appropriate classes for their development level

### Flexible Scheduling with Day-Specific Bookings
- Classes can be booked for specific days from Monday to Saturday
- Parents select their preferred day when adding a class to cart using day selection buttons
- Each day maintains separate booking records in the `sessionsBooked` array
- The system tracks which children are booked for which specific days with their details

### Comprehensive Child Information Management
- When booking a class, parents must provide:
  - Child's full name (required field)
  - Child's age (validated between 5-18 years)
  - Preferred day of the week (Monday to Saturday)
- This information is stored with each booking and displayed in the cart and order confirmations
- Child details are preserved throughout the booking process and included in the final order data

### Smart Spaces Management with Day-Specific Tracking
- **Available spaces are calculated dynamically** considering bookings across all days
- Each class has a fixed total number of spaces (`spaces` field) that represents the maximum capacity
- The system uses `sessionsBooked` array to track bookings per day with student details including name and spaces booked
- **Spaces calculation logic**: `Available Spaces = Total Spaces - (Sum of all spaces booked across all days and all students)`
- Real-time updates ensure accurate space availability display
- Spaces are reduced by one when a booking is made

### Advanced Sorting System with Custom Merge Sort
- **Custom Merge Sort Algorithm**: I implemented my own sorting system that efficiently handles different data types with O(n log n) time complexity
- Sort by attributes:
  - **Subject** (alphabetical A-Z or Z-A) - sorts alphabetically by subject name
  - **Location** (with intelligent distance-based sorting when user selects their region) - uses region distance mapping
  - **Price** (low to high or high to low, considering discounts) - sorts numerically by price
  - **Available Spaces** (shows classes with most spaces first or last) - sorts by calculated available spaces
- **Bidirectional sorting**: Ascending/Descending order toggle for all attributes
- **Region-based location sorting**: When user selects their region, sorts by distance using predefined region distances

### Powerful Search Functionality (Backend Implementation)
- **Backend-powered full-text search** using MongoDB text indexing and aggregation
- Search across all class attributes: title, subject, professor, price, rating, location
- **Search examples**:
  - Type "5" to find classes with 5-star ratings
  - Type "Rs 30" to find classes around Rs 30 price
  - Type "math" to find math-related classes
  - Type location names to find classes in specific areas
- **Search-as-you-type** with 300ms debouncing for smooth performance
- Real-time results from backend API endpoint `/search?q=query`
- Search results integrated with all filtering and sorting features

### Shopping Cart Functionality
- **Add to Cart** button on each lesson, always visible but disabled when space = 0
- Button only enabled when space is larger than 0
- Clicking button once adds one space to shopping cart, reducing remaining space by one
- Shopping cart button only enabled after at least one lesson is added to cart
- Clicking cart button shows cart page, clicking again goes back to lesson page
- Shopping cart shows all lessons added with child information
- Users can remove lessons from cart, which adds the space back to lesson list

### Checkout Functionality
- Checkout is part of the shopping cart page (not lessons page)
- "Checkout" button always visible but only enabled after valid "Name" and "Phone" are provided
- **Form validation using JavaScript regular expressions**:
  - Name must be letters only (regex: `/^[A-Za-z\s]+$/`)
  - Phone must be numbers only (regex: `/^\d+$/`) with minimum 7 digits
  - Card number validation (16 digits with formatting)
  - Expiry date validation (MM/YY format)
  - CVV validation (3 digits)
- Clicking "checkout" button displays confirmation message confirming order submission

### Secure Payment Processing
- **Payment Data Encryption**:
  - Card numbers encrypted using character shifting algorithm (each digit shifted by 5)
  - CVV encrypted using bitwise operations: `((num << 2) + 15) ^ 42`
  - Sensitive data is encrypted before being sent to backend
- All payment form fields have proper validation and formatting

### Order Processing and Data Management
- When checkout is completed:
  - Order is saved via POST to `/orders` with parent information, phone number, and all booked items including child details
  - Each lesson is updated via PUT to `/lessons/:id` with new booking information in the `sessionsBooked` array
  - The `sessionsBooked` array is updated with new student entry for the specific day including child name and spaces booked
  - Available spaces are recalculated across the system
- Complete order confirmation modal with all child and scheduling information
- Order summary includes all booked classes with child details and selected days

### Discount Management
- Special offers section with discounted classes in a carousel display
- Automatic detection and removal of expired discounts using PUT requests
- Countdown timer showing days left for each discount
- Urgency indicators (red/orange/green) for ending soon discounts
- Discounted price calculation: `Math.round(lesson.price * (1 - lesson.discountPercent / 100))`

### API Connections
The website communicates with the backend using these REST API calls:

1. **GET /lessons** - Fetches all classes from the database including current bookings and `sessionsBooked` data
2. **POST /orders** - Saves new bookings with parent information, child details, selected days, and contact information
3. **PUT /lessons/:id** - Updates class `sessionsBooked` array with new student bookings and manages expired discounts
4. **GET /search?q=query** - Performs full-text search using backend MongoDB indexing

### File Structure
```
frontend/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All custom styling and responsive design
├── js/
│   └── app.js          # Complete Vue.js application with all data, methods, and lifecycle hooks
```

## Technical Implementation Details

### Vue.js Features Used
- `v-for` - Looping through classes, cart items, search results, and available days
- `v-on` - Handling button clicks, form inputs, search input, and user interactions
- `v-model` - Two-way data binding for forms, filters, and search query
- `v-if` and `v-else` - Conditional rendering of pages, components, and empty states
- `v-bind` or `:` - Binding classes, styles, and attributes dynamically
- Computed properties - For filtered classes, cart totals, validation states, and discounted lessons
- Methods - Custom functions for sorting, searching, encryption, and business logic
- Lifecycle hooks (`created`) - For initial data fetching when application loads

### Data Structure and State Management
The Vue instance manages:
- `lessons` array - All classes from backend with booking data
- `cart` array - Current booking items with child information
- `searchResults` array - Results from search functionality
- `checkoutInfo` object - Parent and payment information
- `childInfo` object - Current child details during booking
- Filter and sort states (`selectedCategory`, `priceRange`, `sortBy`, `sortOrder`)

### Booking Flow and Data Persistence
1. **Class Selection**: User browses and selects a class with available spaces
2. **Child Information Modal**: User provides child name, age (5-18), and preferred day (Mon-Sat)
3. **Cart Management**: Item added to cart with all child and day details preserved
4. **Checkout Process**: Parent information and secure payment details collected with validation
5. **Order Processing**: 
   - Order saved to database via POST
   - Lessons updated with new `sessionsBooked` entries via PUT
   - Spaces recalculated across the system
6. **Confirmation**: Complete booking summary with all child and scheduling information

### Image Loading System
- Dynamic image URLs constructed based on subject names
- Banner image served from backend assets
- Consistent visual representation across all class types

### Merge Sort Algorithm Implementation
- Recursive divide-and-conquer algorithm implemented from scratch
- Handles multiple data types (strings, numbers) with custom comparison logic
- Special handling for location sorting with region-based distance calculation
- Stable sorting that maintains order of equal elements

### Search Implementation
- Backend uses MongoDB text search with indexed fields
- Frontend implements debouncing to optimize API calls
- Search state management to toggle between search results and all lessons
- Integration with existing filtering and sorting systems

### Form Validation System
- Real-time validation using regular expressions
- Dynamic error message display
- Conditional button enabling based on validation state
- Input formatting for card number and expiry date

## How to Run the Project

1. The frontend is deployed on GitHub Pages and accessible at: https://khorisha.github.io/bookmyclass-frontend/
2. The application automatically connects to the backend API at: https://bookmyclass-backend.onrender.com
3. No local setup required - simply visit the GitHub Pages URL to use the application
4. The backend server must be running for all functionality to work properly

## Challenges I Faced

- **Merge Sort Implementation**: Getting the algorithm to work properly with different data types (text, numbers, dates) and special cases like location-based distance sorting, particularly handling the recursive nature and comparison logic
- **Search Performance**: Implementing search-as-you-type with proper debouncing to make it fast and responsive without overwhelming the backend with excessive API calls
- **Complex Spaces Management**: Designing the logic to calculate available spaces based on bookings across different days while maintaining individual student records in the `sessionsBooked` array structure
- **Child Information Tracking**: Ensuring all child details (name, age) and selected days are properly stored, displayed, and preserved throughout the booking process and in the order confirmation
- **Form Validation & Encryption**: Creating robust validation for different input types using regular expressions and implementing secure encryption algorithms for payment data protection
- **Real-time Data Updates**: Ensuring all Vue components reactively update correctly when bookings are made, especially managing the complex `sessionsBooked` data structure and cart states
- **State Management**: Handling the application state between search results, filtered results, and cart interactions while maintaining data consistency

