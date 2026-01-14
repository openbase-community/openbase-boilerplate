# Boilerplate Template System

This directory contains project templates that use variable interpolation to generate customized codebases.

## Template Variable Syntax

### Content Interpolation

Use `$${variable_name}` for variable substitution within file contents:

```python
from $${name_snake}.cli import main

class $${name_pascal}Config(AppConfig):
    """$${name_pretty}"""
```

### Filename Templates

Use `NAME_SNAKE` or similar variables in directory names to create a package directory that will be renamed:

```
/cli/NAME_SNAKE/__init__.py    →    /my_project/__init__.py
/cli/NAME_SNAKE/cli.starter.py →    /my_project/cli.py
```

## File Extensions

### `.starter` Files

Template files that contain `$${variable}` interpolation. The `.starter` extension is removed during processing:

- `cli.starter.py` → `cli.py`
- `README.starter.md` → `README.md`
- `extension.starter.ts` → `extension.ts`

### `.boilersync` Extension (Optional)

Adding `.boilersync` to any file prevents auto-formatting from corrupting template syntax. This is optional and can be used on any file type:

- `pyproject.toml.boilersync` - Prevents formatters from breaking `$${variables}`
- `config.json.boilersync` - Preserves template blocks in JSON

The extension is stripped during template processing.

## Jinja2-Style Blocks

Templates support block inheritance for composable templates:

```toml
$${% block scripts %}
$${ super() }
$${cli_command} = "$${name_snake}.cli:main"
$${% endblock %}
```

Features:
- `$${% block name %}...$${% endblock %}` - Define overridable blocks
- `$${ super() }` - Include parent block content
- `$${% if condition %}...$${% endif %}` - Conditional content

## Template Inheritance

Use `template.json` to extend another template:

```json
{
  "extends": "pip-package"
}
```

Child templates inherit all files from the parent and can override specific blocks in `.boilersync` files.

## Common Template Variables

### Name Transformations

| Variable | Format | Example |
|----------|--------|---------|
| `$${name_snake}` | snake_case | `my_project` |
| `$${name_kebab}` | kebab-case | `my-project` |
| `$${name_pascal}` | PascalCase | `MyProject` |
| `$${name_pretty}` | Human readable | `My Project` |

### Author Information

| Variable | Description |
|----------|-------------|
| `$${author_name}` | Full name |
| `$${author_email}` | Email address |
| `$${author_github_name}` | GitHub username |
| `$${github_user}` | GitHub username (alias) |

### Project Metadata

| Variable | Description |
|----------|-------------|
| `$${description}` | Project description |
| `$${marketing_description}` | Marketing/display description |
| `$${python_version}` | Python version (e.g., "3.10") |
| `$${python_version_ruff}` | Python version for Ruff linter |

### Django-Specific

| Variable | Description |
|----------|-------------|
| `$${api_prefix}` | API URL prefix |
| `$${parent_package_name}` | Parent package namespace |
| `$${apps}` | Django app configurations |

### CLI-Specific

| Variable | Description |
|----------|-------------|
| `$${cli_command}` | CLI entry point command name |
| `$${homebrew_tap_location}` | Homebrew tap location |

### VS Code Extension

| Variable | Description |
|----------|-------------|
| `$${vscode_extension_description}` | Extension description |
| `$${vscode_publisher}` | Extension publisher name |

## Creating a New Template

1. **Create the template directory**:
   ```
   /boilerplate/my-template/
   ```

2. **Add template files** using `.starter` extension for files with variables:
   ```
   my-template/
   ├── NAME_SNAKE/
   │   ├── __init__.py
   │   └── main.starter.py
   ├── pyproject.toml              # Add .boilersync if formatters corrupt it
   ├── README.starter.md
   └── template.json               # If extending another template
   ```

3. **Use variable interpolation** in file contents:
   ```python
   """$${name_pretty} - $${description}"""
   
   __version__ = "0.1.0"
   __author__ = "$${author_name}"
   ```

4. **Optional: Extend an existing template** via `template.json`:
   ```json
   {
     "extends": "pip-package"
   }
   ```

5. **Override blocks** in `.boilersync` files to customize inherited content.

