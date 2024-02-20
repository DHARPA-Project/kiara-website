import { getCollection, getDataEntryById } from "astro:content";

/**
 * Generate static paths for all items of a specific datatype for all plugins and versions. See https://docs.astro.build/en/guides/routing/#static-ssg-mode  for the format
 *
 * @param kiaraType - the type of data in Kiara for which static paths are generated (`module_type`, `kiara_model_type` etc)
 * @param pathName - the name of the path parameter where this static path is generated (the bit in square brackets in the file name)
 * @return  an array of objects representing the generated static paths
 */
export async function getStaticPathsForDatatype(
  kiaraType: string,
  pathName: string,
) {
  return (await getCollection("plugins")).flatMap((plugin) => {
    const [name, identifier] = plugin.id.split("/");
    const [_, version] = identifier.split("-");
    const typeIds = Object.keys(plugin.data[kiaraType].item_infos);
    return typeIds.map((t) => ({
      params: { plugin: name, version: version, [pathName]: t },
    }));
  });
}

export async function getStaticPathsForPluginVersions() {
  return (await getCollection("plugins")).map((plugin) => {
    const [name, identifier] = plugin.id.split("/");
    const [_, version] = identifier.split("-");
    return { params: { plugin: name, version: version } };
  });
}

export async function getSpecificKiaraType(
  plugin: string,
  version: string,
  kiaraType: string,
): Promise<Record<string, any>> {
  return (
    await getDataEntryById(
      "plugins",
      // @ts-expect-error the build will fail if this string is not one of the files in the `plugins` content collection
      `${plugin}/kiara_plugin.${plugin}-${version}`,
    )
  ).data[kiaraType].item_infos;
}

export async function getSpecificKiaraTypeInstance(
  plugin: string,
  version: string,
  kiaraType: string,
  thingId: string,
) {
  return (await getSpecificKiaraType(plugin, version, kiaraType))[thingId];
}
