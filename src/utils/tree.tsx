import { ArrayValueKey, StringRecord } from "./tsType";

type Callback<T> = (info: {
	node: T,
	parent: T | null,
	level: number,
	parentLevel: number,
}) => void


type Options<T extends StringRecord> = (
	{
		iterType?: 'bfs' | 'dfs_pre' | 'dfs_post'
		callback?: Callback<T>
	}
	|
	{
		iterType?: 'dfs_pre_post',
		dfsPreCallback?: Callback<T>,
		dfsPostCallback?: Callback<T>
	}
) & {
	listName?: ArrayValueKey<T>,
}


export function walkTree<T extends StringRecord>(tree: T[], options?: Options<T>, level = 0) {
	//@ts-ignore
	const { iterType = 'dfs_pre', callback = () => { }, dfsPreCallback = () => { }, dfsPostCallback = () => { }, listName = 'children' } = options || {}

	// const iterType = options?.iterType || 'dfs_pre';
	// const listName = options?.listName || 'children';

	const walk = (nodes: T[], parent: T | null, parentLevel: number) => {
		if (iterType === 'bfs') {
			const queue: { node: T, parent: T | null, parentLevel: number, level: number }[] = nodes.map(node => ({ node, parent, parentLevel, level }));
			while (queue.length) {
				const { node, parent, parentLevel, level } = queue.shift()!;
				callback({ node, parent, level, parentLevel });
				const children = node[listName] as T[] | undefined;
				if (children) {
					queue.push(...children.map(child => ({ node: child, parent: node, parentLevel: level + 1, level: level + 1 })));
				}
			}
		} else {
			const dfs = (node: T, parent: T | null, parentLevel: number, currentLevel: number) => {
				if (iterType === 'dfs_pre') {
					callback({ node, parent, level: currentLevel, parentLevel });
				}
				if (iterType === 'dfs_pre_post') {
					dfsPreCallback({ node, parent, level: currentLevel, parentLevel });
				}
				const children = node[listName] as T[] | undefined;
				if (children) {
					children.forEach(child => dfs(child, node, currentLevel + 1, currentLevel + 1));
				}
				if (iterType === 'dfs_post') {
					callback({ node, parent, level: currentLevel, parentLevel });
				}
				if (iterType === 'dfs_pre_post') {
					dfsPostCallback({ node, parent, level: currentLevel, parentLevel });
				}
			};
			nodes.forEach(node => dfs(node, parent, parentLevel, level));
		}
	};

	walk(tree, null, level);
}

export function findFisrtLayerNode<T extends StringRecord>(tree: T[]) {
	let firstLayerNode = null
	let childrenList = tree
	while (childrenList.length) {
		firstLayerNode = childrenList[0]
		childrenList = firstLayerNode?.children || [] as T[]
	}
	return firstLayerNode
}
