// Test utility for simulating API failures and testing fallback mechanisms

import { getTafseer } from '../services/quranApi';
import { getLocalTafseer, hasLocalTafseer } from '../data/localTafseer';

// Test configuration
const TEST_CONFIG = {
  testSurah: 1, // Al-Fatiha
  testAyah: 1,
  timeoutMs: 2000
};

// Function to test individual endpoint failures
export const testEndpointFallback = async () => {
  console.log('🧪 Testing Tafseer Fallback System...');
  console.log('=' .repeat(50));
  
  try {
    // Test with Al-Fatiha (should have local fallback)
    console.log(`📖 Testing Surah ${TEST_CONFIG.testSurah}, Ayah ${TEST_CONFIG.testAyah}`);
    
    const startTime = Date.now();
    const result = await getTafseer('en-tafisr-ibn-kathir', TEST_CONFIG.testSurah, TEST_CONFIG.testAyah);
    const endTime = Date.now();
    
    console.log(`✅ Success! Response time: ${endTime - startTime}ms`);
    console.log(`📡 API Source: ${result.apiSource || 'Unknown'}`);
    console.log(`📝 Text preview: ${result.text.substring(0, 100)}...`);
    console.log(`🏷️  Source: ${result.source?.name || 'Unknown'}`);
    
    return { success: true, result, responseTime: endTime - startTime };
  } catch (error) {
    console.error('❌ Fallback test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Function to test local fallback data
export const testLocalFallback = () => {
  console.log('\n🏠 Testing Local Fallback Data...');
  console.log('=' .repeat(50));
  
  const testCases = [
    { surah: 1, ayah: 1 }, // Al-Fatiha
    { surah: 112, ayah: 1 }, // Al-Ikhlas
    { surah: 113, ayah: 1 }, // Al-Falaq
    { surah: 114, ayah: 1 }, // An-Nas
    { surah: 2, ayah: 1 }, // Al-Baqarah (should not have local data)
  ];
  
  const results = testCases.map(({ surah, ayah }) => {
    const hasLocal = hasLocalTafseer(surah);
    const localData = getLocalTafseer(surah, ayah);
    
    console.log(`📖 Surah ${surah}, Ayah ${ayah}:`);
    console.log(`   Has local data: ${hasLocal ? '✅' : '❌'}`);
    if (localData) {
      console.log(`   Preview: ${localData.substring(0, 80)}...`);
    }
    console.log('');
    
    return { surah, ayah, hasLocal, hasData: !!localData };
  });
  
  return results;
};

// Function to run comprehensive fallback tests
export const runFallbackTests = async () => {
  console.log('🚀 Starting Comprehensive Fallback Tests');
  console.log('=' .repeat(60));
  
  // Test local fallback data
  const localResults = testLocalFallback();
  
  // Test API fallback mechanism
  const apiResult = await testEndpointFallback();
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log('=' .repeat(30));
  console.log(`Local fallback surahs available: ${localResults.filter(r => r.hasLocal).length}`);
  console.log(`API fallback test: ${apiResult.success ? '✅ Passed' : '❌ Failed'}`);
  
  if (apiResult.success) {
    console.log(`Response time: ${apiResult.responseTime}ms`);
  } else {
    console.log(`Error: ${apiResult.error}`);
  }
  
  return {
    localFallbackCount: localResults.filter(r => r.hasLocal).length,
    apiFallbackSuccess: apiResult.success,
    responseTime: apiResult.responseTime || 0
  };
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testFallback = {
    runTests: runFallbackTests,
    testEndpoint: testEndpointFallback,
    testLocal: testLocalFallback
  };
}