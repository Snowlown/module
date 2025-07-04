export interface IProps {
    name: string,
    age: number
}

export default function HelloRemote({ name, age }: IProps) {
    return <>
        <div style={{ color: 'green', fontSize: '500' }} >我是远程应用的组件 HelloRemote</div>
        <div>name:{name}</div>
        <div>age:{age}</div>
    </>
}
