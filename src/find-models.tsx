import {
  ActionPanel,
  Action,
  List,
  showToast,
  Toast,
  Clipboard,
  Icon,
} from "@raycast/api";
import React, { useState, useEffect } from "react";
import { fetchOpenRouterModels, OpenRouterModel, formatTokens } from "./api";

export default function FindModels() {
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function loadModels() {
      try {
        const fetchedModels = await fetchOpenRouterModels();
        setModels(fetchedModels);
        showToast({
          style: Toast.Style.Success,
          title: "Models Loaded Successfully",
          message: `Loaded ${fetchedModels.length} models`,
        });
      } catch (error) {
        showToast({
          style: Toast.Style.Failure,
          title: "Loading Failed",
          message: "Failed to fetch OpenRouter models",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadModels();
  }, []);

  const filteredModels = models
    .filter(
      (model) =>
        model.id.toLowerCase().includes(searchText.toLowerCase()) ||
        model.name.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => {
      // Sort by release date, newest first
      return b.created - a.created;
    });

  async function copyToClipboard(modelId: string) {
    try {
      await Clipboard.copy(modelId);
      showToast({
        style: Toast.Style.Success,
        title: "Copied to Clipboard",
        message: `Model ID: ${modelId}`,
      });
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Copy Failed",
        message: "Unable to copy to clipboard",
      });
    }
  }

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search OpenRouter models..."
      throttle
    >
      {filteredModels.map((model) => (
        <List.Item
          key={model.id}
          title={model.name}
          subtitle={model.id}
          accessories={[
            {
              text: formatTokens(model.context_length),
            },
          ]}
          actions={
            <ActionPanel>
              <Action
                title="Copy Model Id"
                icon={Icon.Clipboard}
                onAction={() => copyToClipboard(model.id)}
              />
              <Action
                title="Copy Model Name"
                icon={Icon.Text}
                onAction={() => copyToClipboard(model.name)}
              />
              <Action.OpenInBrowser
                title="View on OpenRouter"
                url={`https://openrouter.ai/models/${model.id}`}
              />
            </ActionPanel>
          }
        />
      ))}
      {!isLoading && filteredModels.length === 0 && (
        <List.EmptyView
          title="No Models Found"
          description="Try using different search keywords"
        />
      )}
    </List>
  );
}
