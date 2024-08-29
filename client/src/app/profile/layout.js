export default function ProfileLayout({ children, orders, userinfo }) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-md:px-3">
        {userinfo}
        {orders}
      </div>
    </div>
  );
}
