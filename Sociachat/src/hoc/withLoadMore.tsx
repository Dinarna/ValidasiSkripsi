import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface WithLoadMoreProps {
  items: any[];
  itemsPerPage: number;
  selectedModel?: "cnn" | "cnn-lstm" | "cnn-bilstm";
  modelKey?: "sentiment" | "emotions";
}

export const withLoadMore =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & WithLoadMoreProps> =>
  ({ items, itemsPerPage, selectedModel, modelKey, ...props }) => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(itemsPerPage);

    useEffect(() => {
      setVisibleItemsCount(itemsPerPage);
    }, [selectedModel]);

    const handleLoadMoreTweet = () => {
      setVisibleItemsCount((prevCount) => prevCount + itemsPerPage);
    };

    const filteredItems =
      selectedModel !== undefined
        ? items.filter((item) => {
            if (selectedModel === "cnn") {
              return item[`predicted_${modelKey}_cnn`] !== undefined;
            } else if (selectedModel === "cnn-lstm") {
              return item[`predicted_${modelKey}_cnn_lstm`] !== undefined;
            } else if (selectedModel === "cnn-bilstm") {
              return item[`predicted_${modelKey}_bilstm`] !== undefined;
            }
            return false;
          })
        : items;

    if (filteredItems.length === 0) {
      return <div className="text-center">No tweets available.</div>;
    }

    const currentItems = items.slice(0, visibleItemsCount) || [];

    return (
      <div className="w-full">
        <WrappedComponent {...(props as P)} items={currentItems} />
        {visibleItemsCount < filteredItems.length && (
          <div className="flex justify-center mt-4">
            <Button type="button" onClick={handleLoadMoreTweet} variant="default">
              Load More
            </Button>
          </div>
        )}
      </div>
    );
  };
