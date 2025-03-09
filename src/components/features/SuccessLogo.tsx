function SuccessLogo() {
  return (
    <div className="flex items-center">
      <div className="text-navy-blue">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8Z"
            fill="#0F2A5A"
            fillOpacity="0.1"
          />
          <path
            d="M32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32C52 20.9543 43.0457 12 32 12Z"
            fill="#0F2A5A"
            fillOpacity="0.1"
          />
          <path
            d="M39.5 24H24.5C22.0147 24 20 26.0147 20 28.5V35.5C20 37.9853 22.0147 40 24.5 40H39.5C41.9853 40 44 37.9853 44 35.5V28.5C44 26.0147 41.9853 24 39.5 24Z"
            fill="#0F2A5A"
          />
          <path
            d="M27 30C27 28.3431 28.3431 27 30 27H34C35.6569 27 37 28.3431 37 30V34C37 35.6569 35.6569 37 34 37H30C28.3431 37 27 35.6569 27 34V30Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="ml-2">
        <h2 className="text-[#0F2A5A] font-bold text-xl">SUCCESS</h2>
        <p className="text-[#0F2A5A] text-lg">ACADEMY</p>
      </div>
    </div>
  );
}

export default SuccessLogo;
