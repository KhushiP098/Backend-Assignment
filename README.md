# BackendAssignment API Documentation

This document provides detailed API documentation for all endpoints, including request/response formats, methods, and descriptions.


## Post Endpoints

### 1. Create Post
- **URL:** `/post/create`
- **Method:** `POST`
- **Request Body:** `multipart/form-data`
  - `title` (string, required)
  - `description` (string, required)
  - `tags` (string, comma-separated tag IDs, required)
  - `image` (file, required)
- **Response:**
  - **201 Created**
    ```json
    {
      "success": true,
      "message": "Post created successfully",
      "data": { /* Post object */ }
    }
    ```
  - **400 Bad Request** (missing fields, invalid tags, or image)
  - **500 Internal Server Error**

---

### 2. Get Posts (with Pagination, Sorting, Filtering)
- **URL:** `/post/get`
- **Method:** `GET`
- **Query Parameters:**
  - `page` (number, optional, default: 1)
  - `limit` (number, optional, default: 10)
  - `sort` (string, field to sort by, optional)
  - `order` (string, 'asc' or 'desc', optional)
  - `tag` (string, comma-separated tag IDs, optional)
- **Response:**
  - **200 OK**
    ```json
    {
      "success": true,
      "message": "Posts fetched successfully",
      "data": [ /* Array of Post objects */ ]
    }
    ```
  - **500 Internal Server Error**

---

### 3. Filter Posts by Tags
- **URL:** `/post/filter`
- **Method:** `GET`
- **Request Body:**
  - `tags` (string, comma-separated tag IDs, required)
- **Response:**
  - **200 OK**
    ```json
    {
      "success": true,
      "message": "Posts filtered successfully",
      "data": [ /* Array of Post objects */ ]
    }
    ```
  - **500 Internal Server Error**

---

### 4. Search Posts
- **URL:** `/post/search/:searchKeyword`
- **Method:** `GET`
- **Response:**
  - **200 OK**
    ```json
    {
      "success": true,
      "message": "Posts fetched successfully",
      "data": [ /* Array of Post objects */ ]
    }
    ```
  - **500 Internal Server Error**

---

## Tag Endpoints

### 1. Create Tag
- **URL:** `/tag/create`
- **Method:** `POST`
- **Request Body:**
  - `name` (string, required)
- **Response:**
  - **201 Created**
    ```json
    {
      "success": true,
      "message": "TAG CREATED SUCCESSFULLY",
      "data": { /* Tag object */ }
    }
    ```
  - **400 Bad Request** (missing name or tag exists)
  - **500 Internal Server Error**

---

### 2. Get All Tags
- **URL:** `/tag/get`
- **Method:** `GET`
- **Response:**
  - **201 Created**
    ```json
    {
      "success": true,
      "message": "TAGS FETCHED  SUCCESFULLY",
      "data": [ /* Array of Tag objects */ ]
    }
    ```
  - **500 Internal Server Error**

---

## Models

### Post
- `title`: String (required)
- `description`: String (required)
- `image`: String (required, URL)
- `tags`: Array of ObjectId references to Tag
- `createdAt`, `updatedAt`: Timestamps

### Tag
- `name`: String (required, unique)

---

## Notes
- All endpoints return JSON responses.
- For image upload, use `multipart/form-data`.
- Tag IDs must be valid MongoDB ObjectIds.
- Error responses include a `success: false` and a `message` field.

---

## Example Usage

**Create Post (cURL):**
```bash
curl -X POST http://localhost:3000/post/create \
  -F "title=Sample Post" \
  -F "description=This is a post" \
  -F "tags=tagId1,tagId2" \
  -F "image=@/path/to/image.jpg"
```

**Get Posts:**
```bash
curl http://localhost:3000/post/get?page=1&limit=5&sort=title&order=asc&tag=tagId1,tagId2
```

**Create Tag:**
```bash
curl -X POST http://localhost:3000/tag/create -H "Content-Type: application/json" -d '{"name":"Tech"}'
```

---

## License
MIT
