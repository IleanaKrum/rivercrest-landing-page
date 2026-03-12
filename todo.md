# Rivercrest FMC Landing Page - TODO

## Completed Features
- [x] Hero section with brand story
- [x] Service cards from featured content
- [x] Social proof with member testimonials
- [x] Contact form with location info
- [x] Modern Spiritual Minimalism design
- [x] Responsive navigation
- [x] Professional footer

## Completed Features (continued)
- [x] Giving/Donations page (simplified - no payment processing)
  - [x] Design donations page layout
  - [x] Create donation type selection UI (tithe, offering, special projects)
  - [x] Add donation amount options
  - [x] Build contact form for donor information
  - [x] Create confirmation message
  - [x] Add route and navigation link

## Future Features
- [ ] Events Calendar with filtering
- [ ] Prayer Request Form with email notifications
- [ ] Admin dashboard for managing donations
- [ ] Email receipts for donors
- [ ] Recurring donation support
- [ ] Anonymous giving option

## Completed Features (Center of Studies)
- [x] Database schema for courses, applications, and student progress
  - [x] Create courses table with track types
  - [x] Create applications table
  - [x] Create student_progress table
  - [x] Create course_sessions table
- [x] Public Center of Studies overview page
  - [x] Display four training tracks
  - [x] Build application form
  - [x] Validate and store applications
- [x] Protected student dashboard
  - [x] Display enrolled courses
  - [x] Show progress tracking
  - [x] List available course syllabuses
- [x] Course syllabuses page
  - [x] Display course descriptions
  - [x] Show session details and commitments
  - [x] Access control for enrolled students
- [x] Authentication integration
  - [x] Protect student pages with login requirement
  - [x] Link applications to user accounts
  - [x] Test login flows

## In Progress - Admin Dashboard
- [ ] Add admin database queries and tRPC procedures
  - [ ] Get all applications with filtering
  - [ ] Update application status
  - [ ] Get all courses and sessions
  - [ ] Create/update/delete courses
  - [ ] Get all enrollments and progress
- [ ] Build admin dashboard layout
  - [ ] Create admin navigation
  - [ ] Build dashboard overview
  - [ ] Add role-based access control
- [ ] Application management section
  - [ ] List all applications
  - [ ] Review application details
  - [ ] Approve/reject applications
  - [ ] Filter by status and track
- [ ] Course management section
  - [ ] List all courses
  - [ ] Create new courses
  - [ ] Edit course details
  - [ ] Manage course sessions
- [ ] Student progress tracking
  - [ ] View all students
  - [ ] Track enrollment status
  - [ ] Monitor session completion
  - [ ] Generate progress reports


## In Progress - Mission Statement Integration
- [ ] Add "The Abrahamic Root" mission statement to landing page
  - [ ] Create mission statement section with theological content
  - [ ] Display Genesis 12:3 and Psalm 22:27-28 passages
  - [ ] Integrate into Center of Studies overview
  - [ ] Add to student orientation materials


## Completed - Course Registration with Printed Materials
- [x] Add database schema for course registrations
  - [x] Create registrations table with student info
  - [x] Add printed materials flag and payment status
  - [x] Track registration date and payment amount
- [x] Build student course registration form
  - [x] Collect student contact information
  - [x] Add printed materials option ($45 USA only)
  - [x] Show payment instructions
  - [x] Confirmation message after registration
- [x] Add tRPC procedures for course registration
  - [x] registerForCourse mutation with USA validation
  - [x] getCourseRegistrationsByCourse query
  - [x] Admin getAllCourseRegistrations query
  - [x] Admin updateCourseRegistrationPaymentStatus mutation
- [x] Write comprehensive vitest tests
  - [x] Test registration creation with/without materials
  - [x] Test payment status transitions
  - [x] Test USA country validation
  - [x] Test printed materials cost calculation
- [ ] Add admin interface for registrations (future)
  - [ ] View all course registrations
  - [ ] Filter by course and payment status
  - [ ] Export registration list
  - [ ] Mark payments as received
