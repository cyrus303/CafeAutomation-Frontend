interface CouponCodeProps {
  code: string;
}

export default function CouponCode({ code }: CouponCodeProps) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-cafe-800 mb-4">
        🎉 Congratulations!
      </h3>
      <p className="text-gray-600 mb-6">
        Here's your exclusive coupon code:
      </p>
      <div className="bg-cafe-100 p-6 rounded-lg mb-6">
        <p className="text-3xl font-mono font-bold tracking-widest text-cafe-800">
          {code}
        </p>
      </div>
      <div className="text-sm text-gray-600">
        <p className="mb-2">Present this code at our café to redeem your free drink!</p>
        <p>Valid for 30 days from today.</p>
      </div>
    </div>
  );
}