import packageJson from "../../package.json";

export function PackageJson() {
	return {
		name: packageJson.name,
		version: packageJson.version,
	};
}
