"use client";

import { useState, useMemo } from "react";

const DEFAULT_EXCLUDE = "recipes/";

export default function AdvancementTool() {
  const [loading, setLoading] = useState(false);
  const [excludeInput, setExcludeInput] = useState(DEFAULT_EXCLUDE);
  const [rawAdvancements, setRawAdvancements] = useState<string[] | null>(null);

  const json = useMemo(() => {
    if (rawAdvancements === null) return "";

    const excludePrefixes = excludeInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const filtered = rawAdvancements.filter(
      (ad) => !excludePrefixes.some((p) => ad.slice("minecraft:".length).startsWith(p)),
    );

    return JSON.stringify(
      {
        criteria: {
          complete_all_advancement: {
            conditions: {
              player: {
                type_specific: {
                  advancements: Object.fromEntries(
                    filtered.map((key) => [key, true]),
                  ),
                },
              },
            },
            trigger: "minecraft:location",
          },
        },
        rewards: {
          function: ["your function here"],
        },
      },
      null,
      2,
    );
  }, [rawAdvancements, excludeInput]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);

    try {
      const advancements: string[] = [];

      for (const file of files) {
        let path = file.webkitRelativePath || file.name;
        path = path.replaceAll("\\", "/");

        if (!path.endsWith(".json")) continue;

        const idx = path.lastIndexOf("advancement/");
        if (idx !== -1) {
          path = path.slice(idx + "advancement/".length);
        }

        const ad = path.replace(/\.json$/, "");

        advancements.push(`minecraft:${ad}`);
      }

      setRawAdvancements(advancements);
    } catch {
      setRawAdvancements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Exclude Prefixes
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          Advancements whose path starts with any of these prefixes (one per line) will be excluded.
        </p>
        <textarea
          value={excludeInput}
          onChange={(e) => setExcludeInput(e.target.value)}
          className="w-full h-24 p-3 font-mono text-sm bg-muted border border-border rounded-lg resize-y"
        />
      </div>

      <input
        type="file"
        {...{ webkitdirectory: "" }}
        onChange={handleUpload}
        className="block w-full text-sm text-secondary-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
      />

      {loading && <p className="text-muted-foreground">Processing...</p>}

      {json !== "" && !loading && (
        <>
          <h2>Generated JSON</h2>
          <textarea
            readOnly
            value={json}
            className="w-full h-96 p-4 font-mono text-sm bg-muted border border-border rounded-lg resize-y"
            onClick={(e) => {
              (e.target as HTMLTextAreaElement).select();
            }}
          />
        </>
      )}
    </div>
  );
}
