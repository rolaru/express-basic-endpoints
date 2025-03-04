import { Post } from './../entities/post.entity';
import dataSource from './../db/data-source';

export const postRepository = dataSource.getRepository(Post);

export const getPosts = async () => {
  return await postRepository.find();
};

export const getPost = async (id: number) => {
  return await postRepository.findOneBy({ id });
};