import { Router } from 'express';
import { getPost, getPosts } from './../services/post.service';

const postController = Router();

/**
 * Get all posts endpoint.
 */
postController.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Get single post by ID endpoint.
 */
postController.get('/:id', async (req, res) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      res.status(400).send('Invalid post ID.');
      return;
    }

    const post = await getPost(postId);
    res.json(post);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default postController;