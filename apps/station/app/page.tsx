import { SEO_INFO } from 'client/consts/seoInfo';
import { TasksPage } from 'client/pages/TasksPage/TasksPage';
import { Metadata } from 'next';

export default function Page() {
  return <TasksPage />;
}

export function generateMetadata(): Metadata {
  return {
    title: `Tasks | ${SEO_INFO.title}`,
  };
}
