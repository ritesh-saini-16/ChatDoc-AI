export default function getId(pathname) {
  const routes = pathname.split("/");
  return routes[routes.length - 1];
}
