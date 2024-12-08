import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";


const categoriesWithImages = [
  { id: "tops", image: "/src/assets/topicon.jpeg" , path: "/shop/listing?category=tops"},
  { id: "bottoms", label: "Bottoms", image: "/src/assets/bottoms.jpeg", path: "/shop/listing?category=bottoms" },
  { id: "footwear", label: "Footwear", image: "/src/assets/shoes.jpeg", path: "/shop/listing?category=footwear"},
  { id: "accessories", label: "Accessories", image: "/src/assets/accessories.jpeg", path: "/shop/listing?category=accessories" },
];

const brandsWithImages = [
  { id: "saya",  image: "/src/assets/saya.jpeg" },
  { id: "miniso", label: "Miniso", image: "/src/assets/miniso.jpeg" },
  { id: "bonanza", label: "Bonanza", image: "/src/assets/bonanza.jpeg" },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000); // Current interval is 5000ms (5 seconds). Reduce this to make it faster.
    
    return () => clearInterval(timer);
  }, [featureImageList]);
  
  return (
    <div className="flex flex-col min-h-screen">
   <div className="relative w-full h-[600px] overflow-hidden">
  {featureImageList && featureImageList.length > 0
    ? featureImageList.map((slide, index) => (
        <img
          src={slide?.image}
          key={index}
          className={`${
            index === currentSlide ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500`}
        />
      ))
    : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
 
      <section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {categoriesWithImages.map((categoryItem) => (
        <Card
          key={categoryItem.id}
          onClick={() => handleNavigateToListingPage(categoryItem, "category")}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardContent className="p-0">
            <img
              src={categoryItem.image}
              alt={categoryItem.label}
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

<section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {brandsWithImages.map((brandItem) => (
        <Card
          key={brandItem.id}
          onClick={() => handleNavigateToListingPage(brandItem, "brand")}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardContent className="p-0">
            <img
              src={brandItem.image}
              alt={brandItem.label}
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
