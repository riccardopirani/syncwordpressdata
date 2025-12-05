import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'fs';

describe('Health Checks', () => {
  
  it('dovrebbe avere tutti i file necessari', () => {
    const requiredFiles = [
      'package.json',
      'index.js',
      'config.js',
      'wordpress.js',
      'api-fetcher.js',
      'README.md'
    ];

    requiredFiles.forEach(file => {
      try {
        readFileSync(file);
        assert.ok(true, `${file} exists`);
      } catch (error) {
        assert.fail(`File mancante: ${file}`);
      }
    });
  });

  it('dovrebbe avere package.json valido', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    assert.ok(pkg.name, 'Package name should exist');
    assert.ok(pkg.version, 'Version should exist');
    assert.ok(pkg.dependencies, 'Dependencies should exist');
    assert.ok(pkg.dependencies.axios, 'axios should be in dependencies');
    assert.ok(pkg.dependencies.dotenv, 'dotenv should be in dependencies');
  });

  it('dovrebbe avere script di test configurati', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    assert.ok(pkg.scripts.test, 'Test script should exist');
    assert.ok(pkg.scripts.lint, 'Lint script should exist');
    assert.ok(pkg.scripts.start, 'Start script should exist');
  });

  it('dovrebbe avere documentazione completa', () => {
    const readme = readFileSync('README.md', 'utf8');
    
    assert.ok(readme.includes('WordPress'), 'README should mention WordPress');
    assert.ok(readme.includes('API'), 'README should mention API');
    assert.ok(readme.length > 500, 'README should be comprehensive');
  });

  it('dovrebbe avere template di configurazione', () => {
    try {
      const envTemplate = readFileSync('env.template', 'utf8');
      assert.ok(envTemplate.includes('WORDPRESS_URL'));
      assert.ok(envTemplate.includes('WORDPRESS_USERNAME'));
      assert.ok(envTemplate.includes('SOURCE_API_URL'));
    } catch (error) {
      assert.fail('env.template should exist');
    }
  });
});

