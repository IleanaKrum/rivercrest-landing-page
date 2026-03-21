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


## Completed - Email Notifications for Course Registration
- [x] Set up email service integration
  - [x] Configure Resend email provider
  - [x] Add RESEND_API_KEY environment variable
  - [x] Create email helper functions in server/_core/email.ts
- [x] Create email templates
  - [x] Registration confirmation template with course details
  - [x] Payment instructions for printed materials ($45 USA only)
  - [x] Admin notification template with payment alerts
- [x] Implement email sending
  - [x] Send confirmation on successful registration
  - [x] Include course details and student info in email
  - [x] Add payment instructions for printed materials
  - [x] Handle email errors gracefully with logging
- [x] Test email functionality
  - [x] Verify emails send on successful registration (8 tests passing)
  - [x] Test with/without printed materials
  - [x] Test error handling and Resend API validation



## Completed - Center of Studies Resources Page
- [x] Upload PDF resources to S3
  - [x] Upload Swahili Book of Discipline PDF (2.1 MB)
  - [x] Get CDN URLs for resources
- [x] Create database schema for resources
  - [x] Add resources table with title, description, file URL, category
  - [x] Add resource categories (Books, Syllabuses, Guidelines, Articles, Other)
  - [x] Add language field for multi-language support
- [x] Build Resources Page
  - [x] Create Resources component with resource listings
  - [x] Add category filtering with button toggles
  - [x] Display resource descriptions and download links
  - [x] Responsive grid layout (mobile, tablet, desktop)
  - [x] File size formatting and metadata display
- [x] Integrate with navigation
  - [x] Add Resources link to Center of Studies navigation
  - [x] Add /resources route to App.tsx
- [x] Backend API
  - [x] Create tRPC procedures for resource queries
  - [x] getAllResources, getResourcesByCategory, getResourceById
  - [x] Admin procedures for creating/updating/deleting resources
- [x] Testing
  - [x] 13 comprehensive vitest tests (all passing)
  - [x] Tests cover creation, retrieval, filtering, and metadata
  - [x] Verified Swahili Book of Discipline is in database
  - [ ] Test on mobile devices


## Completed - Email Notification Feature Showcase
- [x] Create showcase webpage
  - [x] Design layout with feature highlights
  - [x] Generate email mockup images (student & admin)
  - [x] Add interactive demo section with tab switching
  - [x] Showcase benefits and use cases
- [x] Build showcase component
  - [x] Create EmailNotificationShowcase page (EmailNotificationShowcase.tsx)
  - [x] Add to navigation (/email-notifications route)
  - [x] Responsive design for all devices
  - [x] Professional hero section with CTAs
- [x] Integration
  - [x] Link from Center of Studies page (Features nav link)
  - [x] Add to App.tsx routing
  - [x] Test all interactive elements
  - [x] All 34 tests passing
