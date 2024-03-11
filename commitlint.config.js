// #commitlint配置文件内配置提交规则
export default {
  extends: ["@commitlint/config-conventional"],
  // # 提交格式（注意冒号后面有空格）
  // # git commit -m <type>[optional? scope]: <description>
  // # 例如：feat: 新功能
  rules: {
    "type-enum": [2, "always",
      [ 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test',]
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0],
    "subject-empty": [0],
    "subject-case": [0],
    "header-max-length": [0],
  },
  // "path": "./node_modules/cz-conventional-changelog"
};
