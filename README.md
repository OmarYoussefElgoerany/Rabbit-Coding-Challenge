
##Documentation
1. Top 10 Most Frequently Ordered Products API
Description: Developed an API that returns the top 10 most frequently ordered products in a specific area. This area can be identified based on the user's location or region.
Ensured the API could handle millions of requests efficiently, optimizing it for high traffic environments.
2. Optimizing a Poorly Implemented List Products API
Optimized an existing /products API that suffered from poor performance due to inefficient database queries and bad coding practices.
Key Actions:
Conducted a thorough review of the API’s implementation, identifying bottlenecks and areas for improvement.
Refactored the code and optimized the database queries to improve performance.
3. Test Cases
Description: Wrote comprehensive test cases for both APIs to ensure reliability, performance, and correctness.
Key Features:
Implemented unit tests for both the top products API and the optimized list products API.
Ensured proper error handling, validation, and edge cases were accounted for in the tests.

Additional Optimizations I Would Consider (If Given More Time):
Caching:
Implement caching mechanisms (e.g., Redis) to store the results of frequently accessed data, like the top 10 most frequently ordered products, reducing the load on the database.
Database Indexing:

Add relevant indexes on the database, especially for frequently queried fields like  area to speed up query performance.
Implement composite indexes if multiple fields are being queried simultaneously to reduce the time spent on searches.
Database Query Optimization:
Optimize database queries by avoiding SELECT * and instead selecting only the necessary fields to reduce overhead.

