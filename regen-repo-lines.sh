#!/bin/bash
# requirement: sudo apt-get install cloc (or brew install cloc)

set -e  # Exit on error
set -u  # Error on undefined variables

output_file="repo-lines.md"

# Delete existing file if it exists or create empty file
> "$output_file"

echo "# Vertex Frontend Lines" >> "$output_file"
echo "**Last updated**: $(date -u '+%Y-%m-%d %H:%M:%S') UTC" >> "$output_file"

# Create regex pattern for excluded directories, including build artifacts and csv files
exclude_pattern="dist|build|.next|node_modules|.*\.csv$|.*\.log$|yarn.lock|charting_library|stats-dashboard"

process_cloc_output() {
    # Use a temporary file
    local tmpfile=$(mktemp)
    cat > "$tmpfile"
    
    # Get the separator line (first one that starts with -)
    local separator=$(grep "^-" "$tmpfile" | head -n 1)
    
    # Print first separator
    echo "$separator"
    # Print header
    grep "^File" "$tmpfile"
    # Print second separator
    echo "$separator"
    
    # Print sorted files (excluding SUM line and header duplicates), fixing double slashes
    grep -v "^-" "$tmpfile" | grep -v "^SUM:" | grep -v "^File" | sed 's|//|/|g' | sort
    
    # Print separator and SUM line
    echo "$separator"
    grep "^SUM:" "$tmpfile"
    
    rm "$tmpfile"
}

# Process apps directory
if [ -d "apps" ]; then
    printf "\n## Apps\n" >> "$output_file"
    for app in apps/*/; do
        if [ -d "$app" ] && [ "$(basename "$app")" != "stats-dashboard" ]; then
            app_name=$(basename "$app")
            printf "\n### %s\n" "apps/$app_name" >> "$output_file"
            
            # Files breakdown
            echo "#### Files" >> "$output_file"
            echo '```' >> "$output_file"
            cloc "$app" --by-file --skip-uniqueness --fullpath --not-match-d="$exclude_pattern" --vcs=git | 
            grep -v "github.com/AlDanial/cloc" |
            process_cloc_output >> "$output_file"
            echo '```' >> "$output_file"
            
            # Summary by language
            echo "#### Summary by Language" >> "$output_file"
            echo '```' >> "$output_file"
            cloc "$app" --skip-uniqueness --fullpath --not-match-d="$exclude_pattern" --vcs=git |
            grep -v "github.com/AlDanial/cloc" >> "$output_file"
            echo '```' >> "$output_file"
        fi
    done
fi

# Process packages directory
if [ -d "packages" ]; then
    printf "\n## Packages\n" >> "$output_file"
    for package in packages/*/; do
        if [ -d "$package" ]; then
            package_name=$(basename "$package")
            printf "\n### %s\n" "package/$package_name" >> "$output_file"
            
            # Files breakdown
            echo "#### Files" >> "$output_file"
            echo '```' >> "$output_file"
            cloc "$package" --by-file --skip-uniqueness --fullpath --not-match-d="$exclude_pattern" --vcs=git | 
            grep -v "github.com/AlDanial/cloc" |
            process_cloc_output >> "$output_file"
            echo '```' >> "$output_file"
            
            # Summary by language
            echo "#### Summary by Language" >> "$output_file"
            echo '```' >> "$output_file"
            cloc "$package" --skip-uniqueness --fullpath --not-match-d="$exclude_pattern" --vcs=git |
            grep -v "github.com/AlDanial/cloc" >> "$output_file"
            echo '```' >> "$output_file"
        fi
    done
fi

printf "\n## Total Summary\n" >> "$output_file"
echo '```' >> "$output_file"
cloc . --skip-uniqueness --fullpath --not-match-d="$exclude_pattern" --vcs=git |
grep -v "github.com/AlDanial/cloc" >> "$output_file"
echo '```' >> "$output_file"