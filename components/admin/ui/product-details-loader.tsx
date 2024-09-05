import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetailsSkeletonLoader = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-9 w-[100px]" />
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          {["Details", "Variants", "Media", "Reviews"].map(tab => (
            <TabsTrigger key={tab} value={tab.toLowerCase()}>
              <Skeleton className="h-4 w-16" />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="flex space-x-4">
                {["Price", "Discount", "Stock"].map(item => (
                  <div key={item} className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-[80px]" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-[100px]" />
                  <Skeleton className="h-8 w-[120px]" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[120px]" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-[90px]" />
                  <Skeleton className="h-8 w-[110px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailsSkeletonLoader;
